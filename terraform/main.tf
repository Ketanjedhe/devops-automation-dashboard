terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  required_version = ">= 1.3.0"
}

provider "aws" {
  region = var.region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_instance" "devops_server" {
  ami           = "ami-03f4878755434977f"        # Ubuntu 22.04 for ap-south-1
  instance_type = var.instance_type
  key_name      = var.key_pair

  vpc_security_group_ids = [aws_security_group.devops_sg.id]

  user_data = file("user-data.sh")

  tags = {
    Name = "DevOps-Automation-Server"
  }
}
