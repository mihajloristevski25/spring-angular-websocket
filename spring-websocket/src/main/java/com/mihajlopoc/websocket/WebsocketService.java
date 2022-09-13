package com.mihajlopoc.websocket;

import org.springframework.stereotype.Service;

@Service
public class WebsocketService {


    public Greeting hello(HelloMessage message) {
           return new Greeting("Hello From, " +
                   message.getName());

    }

}
