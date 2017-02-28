#!/usr/bin/env ruby

cf_distro = "E3UWPOPDXLIHRP"
s3_dev = "s3://dev.mockbrian.com"
s3_prod = "s3://screenhive.net"

def jekyll(*args)
  system "bundle", "exec", "jekyll", "build", *args
end

def sync(bucket)
  system "aws", "s3", "sync",
    "--acl", "public-read",
    "_site/",
    bucket
end

def invalidate(distro)
  system "aws", "cloudfront", "create-invalidation",
    "--distribution-id", distro,
    "--paths", "/*"
end

if ARGV.include?("-p")
  jekyll
  sync s3_prod
  invalidate cf_distro
else
  jekyll "--drafts"
  sync s3_dev
end
