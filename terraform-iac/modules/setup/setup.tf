variable "env" {
  type = string
}

locals {
  # These three lines form the URL for your website.
  # In real life, you should probably use a more human-friendly URL.
  # Something like, "mysite.byu.edu" for prd and "mysite-dev.byu.edu" for dev.
  subdomain = (var.env == "prd") ? "email-campaign-frontend" : "email-campaign-frontend-${var.env}"
  parent    = (var.env == "prd" || var.env == "cpy") ? "byu-dept-fhtl-prd.amazon.byu.edu" : "byu-dept-fhtl-dev.amazon.byu.edu"
  url       = "${local.subdomain}.${local.parent}"
}

resource "aws_route53_zone" "zone" {
  name = local.url
}

output "hosted_zone" {
  value = aws_route53_zone.zone
}
