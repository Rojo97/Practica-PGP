import React, { Component } from 'react';

export default class CrearUsuario extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Crear usuario</h3>
                                </div>
                                <form>
                                    <div className="box-body">
                                        <row>
                                            <column>
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Email address</label>
                                                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleInputPassword1">Password</label>
                                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                                </div>
                                                <div class="form-group">
                                                    <label>Select</label>
                                                    <select class="form-control">
                                                        <option>option 1</option>
                                                        <option>option 2</option>
                                                        <option>option 3</option>
                                                        <option>option 4</option>
                                                        <option>option 5</option>
                                                    </select>
                                                </div>
                                            </column>
                                            <column>
                                                <div class="form-group">
                                                    <label for="exampleInputPassword1">Password</label>
                                                    <input class="form-control" type="text" placeholder="Default input" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleInputPassword1">Password</label>
                                                    <input class="form-control" type="text" placeholder="Default input" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleInputPassword1">Password</label>
                                                    <input class="form-control" type="text" placeholder="Default input" />
                                                </div>
                                                <div class="form-group">
                                                    <label>Date masks:</label>

                                                    <div class="input-group">
                                                        <div class="input-group-addon">
                                                            <i class="fa fa-calendar"></i>
                                                        </div>
                                                        <input type="text" class="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask />
                                                    </div>
                                                </div>
                                            </column>
                                        </row>
                                    </div>
                                    <div className="box-footer">
                                        <div>
                                            <button type="submit" class="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
