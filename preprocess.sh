#! /usr/bin/env bash

cd public/images/day || exit

for day in ./*; do 
(
  cd "$day" || exit
  for file in *.jpg; do 
    # reduce image size
    printf "\r\033[Kreducing image size for %s" "$day/$file"
    convert -delete 1--1 -strip -interlace JPEG -gaussian-blur 0.05 -quality 50% -layers flatten "$file" "$file"
    
    # generate preview
    printf "\r\033[Kgenerating preview for %s" "$day/$file"
    convert -resize 10x10 "$file" "preview/$file"
  done
)
done