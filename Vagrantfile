# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

  config.vm.box = "fedora/28-cloud-base"

  config.vm.network "forwarded_port", guest: 61616, host: 61616
  config.vm.network "forwarded_port", guest: 62626, host: 62626
  config.vm.network "forwarded_port", guest: 8161, host: 18161
  config.vm.network "forwarded_port", guest: 8262, host: 18262
  config.vm.network "forwarded_port", guest: 5672, host: 5672

  config.vm.provider "virtualbox" do |v|
    v.memory = 8192
    v.cpus = 4
  end

  config.vm.provision "ansible" do |a|
   a.playbook = "amq.yml"
  end
end
