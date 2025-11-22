variable "region" {
  default = "ap-south-1"
}

variable "aws_access_key" {
  type = string
}

variable "aws_secret_key" {
  type = string
}

variable "instance_type" {
  default = "t2.medium"
}

variable "key_pair" {
  type = string
}
