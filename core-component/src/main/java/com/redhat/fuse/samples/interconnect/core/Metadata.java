package com.redhat.fuse.samples.interconnect.core;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Metadata {

    private String namConnection;

    private String apacConnection;

    private String accountCommandsAddress;

    private String accountNotificationsAddress;

    public Metadata() {
    }

    public Metadata(String namConnection, String apacConnection, String accountCommandsAddress, String accountNotificationsAddress) {
        this.namConnection = namConnection;
        this.apacConnection = apacConnection;
        this.accountCommandsAddress = accountCommandsAddress;
        this.accountNotificationsAddress = accountNotificationsAddress;
    }

    public String getNamConnection() {
        return namConnection;
    }

    public void setNamConnection(String namConnection) {
        this.namConnection = namConnection;
    }

    public String getApacConnection() {
        return apacConnection;
    }

    public void setApacConnection(String apacConnection) {
        this.apacConnection = apacConnection;
    }

    public String getAccountCommandsAddress() {
        return accountCommandsAddress;
    }

    public void setAccountCommandsAddress(String accountCommandsAddress) {
        this.accountCommandsAddress = accountCommandsAddress;
    }

    public String getAccountNotificationsAddress() {
        return accountNotificationsAddress;
    }

    public void setAccountNotificationsAddress(String accountNotificationsAddress) {
        this.accountNotificationsAddress = accountNotificationsAddress;
    }

    @Override
    public String toString() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
