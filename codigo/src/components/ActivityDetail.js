import React, { Component } from 'react';

export default class ActivityDetail extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Actividad "Nombre Actividad"</h1> {/*TODO nombre dinamico*/}
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box box-primary">
                            hello
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}