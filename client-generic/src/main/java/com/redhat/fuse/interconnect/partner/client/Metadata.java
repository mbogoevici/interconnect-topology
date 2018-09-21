package com.redhat.fuse.interconnect.partner.client;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Metadata {

    private String partner;

    private String connectionUrl;

    private String localRegion;

    private String remoteRegion;

    private String localNotificationAddress;

    private String globalNotificationAddress;

    private String localCommandAddress;

    private String globalCommandAddress;

    public Metadata() {
    }

    public Metadata(String partner, String connectionUrl, String localRegion, String remoteRegion, String localNotificationAddress, String globalNotificationAddress, String localCommandAddress, String globalCommandAddress) {
        this.partner = partner;
        this.connectionUrl = connectionUrl;
        this.localRegion = localRegion;
        this.remoteRegion = remoteRegion;
        this.localNotificationAddress = localNotificationAddress;
        this.globalNotificationAddress = globalNotificationAddress;
        this.localCommandAddress = localCommandAddress;
        this.globalCommandAddress = globalCommandAddress;
    }

    public String getPartner() {
        return partner;
    }

    public void setPartner(String partner) {
        this.partner = partner;
    }

    public String getConnectionUrl() {
        return connectionUrl;
    }

    public void setConnectionUrl(String connectionUrl) {
        this.connectionUrl = connectionUrl;
    }

    public String getLocalNotificationAddress() {
        return localNotificationAddress;
    }

    public void setLocalNotificationAddress(String localNotificationAddress) {
        this.localNotificationAddress = localNotificationAddress;
    }

    public String getGlobalNotificationAddress() {
        return globalNotificationAddress;
    }

    public void setGlobalNotificationAddress(String globalNotificationAddress) {
        this.globalNotificationAddress = globalNotificationAddress;
    }

    public String getLocalCommandAddress() {
        return localCommandAddress;
    }

    public void setLocalCommandAddress(String localCommandAddress) {
        this.localCommandAddress = localCommandAddress;
    }

    public String getGlobalCommandAddress() {
        return globalCommandAddress;
    }

    public void setGlobalCommandAddress(String globalCommandAddress) {
        this.globalCommandAddress = globalCommandAddress;
    }

    public String getLocalRegion() {
        return localRegion;
    }

    public void setLocalRegion(String localRegion) {
        this.localRegion = localRegion;
    }

    public String getRemoteRegion() {
        return remoteRegion;
    }

    public void setRemoteRegion(String remoteRegion) {
        this.remoteRegion = remoteRegion;
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
