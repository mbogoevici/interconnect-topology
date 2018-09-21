package com.redhat.fuse.interconnect.partner.client;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Metadata {

    private String namConnection;

    private String apacConnection;

    private String acmeLocalNotificationAddress;

    private String ecommLocalNotificationAddress;

    private String acmeGlobalNotificationAddress;

    private String ecommGlobalNotificationAddress;

    private String acmeLocalCommandAddress;

    private String ecommLocalCommandAddress;

    private String acmeApacCommandAddress;

    private String ecommNamCommandAddress;

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

    public String getAcmeLocalNotificationAddress() {
        return acmeLocalNotificationAddress;
    }

    public void setAcmeLocalNotificationAddress(String acmeLocalNotificationAddress) {
        this.acmeLocalNotificationAddress = acmeLocalNotificationAddress;
    }

    public String getEcommLocalNotificationAddress() {
        return ecommLocalNotificationAddress;
    }

    public void setEcommLocalNotificationAddress(String ecommLocalNotificationAddress) {
        this.ecommLocalNotificationAddress = ecommLocalNotificationAddress;
    }

    public String getAcmeGlobalNotificationAddress() {
        return acmeGlobalNotificationAddress;
    }

    public void setAcmeGlobalNotificationAddress(String acmeGlobalNotificationAddress) {
        this.acmeGlobalNotificationAddress = acmeGlobalNotificationAddress;
    }

    public String getEcommGlobalNotificationAddress() {
        return ecommGlobalNotificationAddress;
    }

    public void setEcommGlobalNotificationAddress(String ecommGlobalNotificationAddress) {
        this.ecommGlobalNotificationAddress = ecommGlobalNotificationAddress;
    }

    public String getAcmeLocalCommandAddress() {
        return acmeLocalCommandAddress;
    }

    public void setAcmeLocalCommandAddress(String acmeLocalCommandAddress) {
        this.acmeLocalCommandAddress = acmeLocalCommandAddress;
    }

    public String getEcommLocalCommandAddress() {
        return ecommLocalCommandAddress;
    }

    public void setEcommLocalCommandAddress(String ecommLocalCommandAddress) {
        this.ecommLocalCommandAddress = ecommLocalCommandAddress;
    }

    public String getAcmeApacCommandAddress() {
        return acmeApacCommandAddress;
    }

    public void setAcmeApacCommandAddress(String acmeApacCommandAddress) {
        this.acmeApacCommandAddress = acmeApacCommandAddress;
    }

    public String getEcommNamCommandAddress() {
        return ecommNamCommandAddress;
    }

    public void setEcommNamCommandAddress(String ecommNamCommandAddress) {
        this.ecommNamCommandAddress = ecommNamCommandAddress;
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
