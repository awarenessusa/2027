Add-Type -AssemblyName System.Drawing

$src = 'C:\Users\harik\AppData\Local\Temp\devin-pasted-images\1795387715480592800-23604-1-pasted.jpg'
$outDir = 'D:\NHK\awarenessusa.org\client\public\assets'
$threshold = 235

$bmp = New-Object System.Drawing.Bitmap($src)
$w = $bmp.Width; $h = $bmp.Height
Write-Output "Source: ${w}x${h}"

function Is-White([System.Drawing.Color]$px, [int]$t) {
    return ($px.R -ge $t -and $px.G -ge $t -and $px.B -ge $t)
}

# --- Find the gap between flame mark and text: scan for first fully-white
#     vertical band of decent width in the left half of the image ---
$flameEnd = [int]($w * 0.3)
$whiteRun = 0; $gapStart = -1
for ($x = 0; $x -lt [int]($w * 0.5); $x++) {
    $colWhite = $true
    for ($y = 0; $y -lt $h; $y += 2) {
        if (-not (Is-White $bmp.GetPixel($x, $y) $threshold)) { $colWhite = $false; break }
    }
    if ($colWhite) {
        if ($whiteRun -eq 0) { $gapStart = $x }
        $whiteRun++
        if ($whiteRun -ge [int]($w * 0.02) -and $x -gt [int]($w * 0.1)) { $flameEnd = $gapStart; break }
    } else { $whiteRun = 0 }
}
Write-Output "Flame ends at x=$flameEnd"

function Make-Transparent([System.Drawing.Bitmap]$b, [int]$t) {
    for ($y = 0; $y -lt $b.Height; $y++) {
        for ($x = 0; $x -lt $b.Width; $x++) {
            if (Is-White $b.GetPixel($x, $y) $t) {
                $b.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
            }
        }
    }
}

# Full logo, transparent bg
$logo = $bmp.Clone([System.Drawing.Rectangle]::new(0, 0, $w, $h), $bmp.PixelFormat)
Make-Transparent $logo $threshold
$logo.Save("$outDir\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Icon = flame region only, transparent bg
$icon = $bmp.Clone([System.Drawing.Rectangle]::new(0, 0, $flameEnd, $h), $bmp.PixelFormat)
Make-Transparent $icon $threshold
$icon.Save("$outDir\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

$bmp.Dispose(); $logo.Dispose(); $icon.Dispose()
Write-Output "Saved logo.png + icon.png (${flameEnd}x${h})"
