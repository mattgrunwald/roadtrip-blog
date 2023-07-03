#! /usr/env/bash


for day in ./public/images/day/*; do 
  for file in ./public/images/day/$day/*.jpg; do 
    # reduce image size
    convert -strip -interlace Plane -gaussian-blur 0.05 -quality 50% "$file" "./public/images/day/$day/$file"
    
    # generate preview
    convert -resize 10x10 "$file" "./public/images/day/$day/preview/$file"
  done
done

