locals {
  org  = "play"
  name = "platform-core"
  env  = ["prod"]
  # env    = ["stag", "prod"]
  region       = "us-west-2"
  git_conn_arn = "arn:aws:codestar-connections:us-west-2:719641841102:connection/287acdf3-c432-4b12-9d8e-bc8a03910d23"
  git_org      = "masterial"
  git_repo     = format("%s/%s", local.git_org, "play-platform-core")
  git_branch = {
    prod = "master"
    stag = "staging"
  }

  common_tags = {
    region    = local.region
    terraform = true
  }
}

terraform {
  # terraform state storage
  backend "s3" {
    bucket         = "play-terra-state"
    key            = "apps/play-platform-core/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "play-terra-state"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-west-2"
}
