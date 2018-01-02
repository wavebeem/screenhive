#!/usr/bin/env ruby
require "fileutils"
include FileUtils

cd File.dirname($0)
cd "../build" do
  mkdir_p "icon.iconset"
  Dir["../img/*.png"].each do |file|
    m = file.match(%r{Screenhive-(\d+)px[.]png})
    if m
      size = m[1].to_i
      cp file, "icon.iconset/icon_#{size}x#{size}.png"
    end
  end
  system "iconutil", "-c", "icns", "icon.iconset"
  rm_r "icon.iconset"
end
