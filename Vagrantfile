# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

  config.vm.synced_folder '.', '/vagrant', disabled: true

  config.vm.define "baseBox", autostart: false do |baseBox|
     baseBox.vm.box = "fedora/28-cloud-base"
     baseBox.ssh.insert_key=false
     baseBox.vm.provision "ansible" do |a|
       a.playbook = "provisioning/playbook-basebox.yml"
     end
  end

  config.vm.define "allInOne", autostart: false do |all|
    all.vm.box = "mbogoevici/fedora28-java-qdrouterd"

    all.vm.network "forwarded_port", guest: 61616, host: 61616
    all.vm.network "forwarded_port", guest: 62626, host: 62626
    all.vm.network "forwarded_port", guest: 8161, host: 18161
    all.vm.network "forwarded_port", guest: 8262, host: 18262
    all.vm.network "forwarded_port", guest: 5672, host: 5672

    all.vm.provider "virtualbox" do |v|
      v.memory = 8192
      v.cpus = 4
    end

    all.vm.provision "ansible" do |a|
     a.playbook = "provisioning/playbook-allInOne.yml"
    end
  end



  config.vm.define "namBroker" do |region|
    region.vm.box = "mbogoevici/fedora28-java-qdrouterd"
    region.vm.network "forwarded_port", guest: 61616, host: 61616
    region.vm.network "forwarded_port", guest: 8161, host: 18161
    region.vm.network "private_network", ip: "192.168.50.11"
    region.vm.provider "virtualbox" do |v|
      v.memory = 1536
      v.cpus = 1
    end
    region.vm.provision "ansible" do |a|
     a.playbook = "provisioning/playbook-broker.yml"
     a.extra_vars = {
       artemis_port: 61616,
       console_port: 8161
     }
    end
  end

  config.vm.define "apacBroker" do |region|
    region.vm.box = "mbogoevici/fedora28-java-qdrouterd"
    region.vm.network "forwarded_port", guest: 61616, host: 62626
    region.vm.network "forwarded_port", guest: 8161, host: 28161
    region.vm.network "private_network", ip: "192.168.50.12"
    region.vm.provider "virtualbox" do |v|
      v.memory = 1536
      v.cpus = 1
    end
    region.vm.provision "ansible" do |a|
     a.playbook = "provisioning/playbook-broker.yml"
     a.extra_vars = {
       artemis_port: 61616,
       console_port: 8161
     }
    end
  end

  config.vm.define "namRouter" do |router|
    router.vm.box = "mbogoevici/fedora28-java-qdrouterd"
    router.vm.network "forwarded_port", guest: 5672, host: 15672
    router.vm.network "forwarded_port", guest: 8161, host: 38161
    router.vm.network "private_network", ip: "192.168.50.111"
    router.vm.provider "virtualbox" do |v|
      v.memory = 1024
      v.cpus = 1
    end
    router.vm.provision "ansible" do |a|
     a.playbook = "provisioning/playbook-regionRouter.yml"
     a.extra_vars = {
       region_name: "nam",
       local_broker_host: "192.168.50.11",
       local_broker_port: 61616,
       remote_router_host: "192.168.50.112",
       remote_router_port: 5672,
       router_management_port: 8161
     }
    end
  end

  config.vm.define "apacRouter" do |router|
    router.vm.box = "mbogoevici/fedora28-java-qdrouterd"
    router.vm.network "forwarded_port", guest: 5672, host: 25672
    router.vm.network "forwarded_port", guest: 8161, host: 48161
    router.vm.network "private_network", ip: "192.168.50.112"
    router.vm.provider "virtualbox" do |v|
      v.memory = 1024
      v.cpus = 1
    end
    router.vm.provision "ansible" do |a|
     a.playbook = "provisioning/playbook-regionRouter.yml"
     a.extra_vars = {
       region_name: "apac",
       local_broker_host: "192.168.50.12",
       local_broker_port: 61616,
       remote_router_host: "192.168.50.111",
       remote_router_port: 5672,
       router_management_port: 8161
     }
    end
  end

end
