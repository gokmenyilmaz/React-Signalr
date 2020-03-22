import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr'

export default class Home extends Component {
    client = null;

    constructor(props) {
        super(props);
        this.state = {
            gonderen: "",
            mesaj: ""
        };
    }

    componentWillMount() {
        this.client = new HubConnectionBuilder()
            .withUrl("http://localhost:54849/chat")
            .build();
    }

    componentDidMount() {

        this.client.start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection', err));

        this.client.on('broadcastMessage', (name, message) => {
            const text = `${name}: ${message}`;

            this.setState({ gonderen: name, mesaj: message });

        });

    }


    render() {

        return (
            <div>

                <div>http://localhost:54849/home?ad=kamil</div>
                <h2 id="tabelLabel" > {this.state.gonderen}-{this.state.mesaj}</h2>

                
               
            </div>
        );
    }


}
