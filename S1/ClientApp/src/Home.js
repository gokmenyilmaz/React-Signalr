import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr'

export default class Home extends Component {
    client = null;

    constructor(props) {
        super(props);

        this.state = {
            gonderen: "",
            mesaj: "",

            rgonderen: "",
            rmesaj:""
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

            this.setState({ rgonderen: name, rmesaj: message });

        });

    }

    setValue(name,value) {
        var model = this.state;
        model[name] = value;

        this.setState(model)
    }

    OnGonder() {
        const { gonderen, mesaj } = this.state;
        this.client.invoke('send', gonderen, mesaj);
    }


    render() {

        return (
            <div>
                <input name="gonderen" value={this.state.gonderen} onChange={(e) => this.setValue(e.target.name, e.target.value)} />
                <input name="mesaj" value={this.state.mesaj} onChange={(e) => this.setValue(e.target.name, e.target.value)} />

                <button onClick={() => this.OnGonder()} >Gonder</button>

                <div>Postman Test - controller için</div>
                <div>http://localhost:54849/home?ad=kamil</div>

                <h2>Gelen</h2>
                <h2 id="tabelLabel" > {this.state.rgonderen}-{this.state.rmesaj}</h2>

                
               
            </div>
        );
    }


}
