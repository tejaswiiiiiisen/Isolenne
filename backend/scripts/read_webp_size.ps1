Get-ChildItem "d:\macenza\portfolio\*.webp" | ForEach-Object {
    $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
    # Check RIFF and WEBP
    $riff = [System.Text.Encoding]::ASCII.GetString($bytes, 0, 4)
    $webp = [System.Text.Encoding]::ASCII.GetString($bytes, 8, 4)
    $format = [System.Text.Encoding]::ASCII.GetString($bytes, 12, 4)
    if ($format -eq "VP8 ") {
        $w = [BitConverter]::ToUInt16($bytes, 26) -band 0x3fff
        $h = [BitConverter]::ToUInt16($bytes, 28) -band 0x3fff
        Write-Output "$($_.Name) (VP8): ${w}x${h}"
    } elseif ($format -eq "VP8L") {
        $b1 = $bytes[21]
        $b2 = $bytes[22]
        $b3 = $bytes[23]
        $b4 = $bytes[24]
        $w = 1 + ((($b2 -band 0x3F) -shl 8) -bor $b1)
        $h = 1 + ((($b4 -band 0xF) -shl 10) -bor ($b3 -shl 2) -bor (($b2 -band 0xC0) -shr 6))
        Write-Output "$($_.Name) (VP8L): ${w}x${h}"
    } elseif ($format -eq "VP8X") {
        $w = 1 + [BitConverter]::ToUInt32($bytes, 24) -band 0x00FFFFFF
        $h = 1 + [BitConverter]::ToUInt32($bytes, 27) -band 0x00FFFFFF
        Write-Output "$($_.Name) (VP8X): ${w}x${h}"
    } else {
        Write-Output "$($_.Name) format: $format"
    }
}
