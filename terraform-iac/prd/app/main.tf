terraform {
  required_version = "1.0.0"

  backend "s3" {
    bucket         = "terraform-state-storage-646364352403"
    dynamodb_table = "terraform-state-lock-646364352403"
    key            = "email-campaign-frontend-prd/app.tfstate"
    region         = "us-west-2"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

locals {
  env = "prd"
}

provider "aws" {
  region = "us-west-2"

  default_tags {
    tags = {
      env              = local.env
      data-sensitivity = "public"
      repo             = "https://github.com/byu-oit/email-campaign-frontend"
    }
  }
}

module "app" {
  source = "../../modules/app/"
  env    = local.env
}

output "s3_bucket" {
  value = module.app.s3_bucket
}

output "cf_distribution_id" {
  value = module.app.cf_distribution_id
}

output "url" {
  value = module.app.url
}
