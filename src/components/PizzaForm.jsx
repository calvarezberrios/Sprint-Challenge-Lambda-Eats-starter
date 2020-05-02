import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";

import pizza from "../images/Pizza.jpg";

const PizzaOrder = styled.div`
    width: 500px;
    margin: 0 auto;
    margin-top: 30px;
    border: 1px solid black;

    h2 {
        text-align: center;
        font-size: 27px;
        padding: 8px 20px;
    }

    img {
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        margin-bottom: 30px;
    }

    h3 {
        font-size: 20px;
        padding: 8px 20px;
        
    }

    .form-group .inputLabel {
        background: #E1E0E1;
        width: 100%;
        padding: 8px 20px;
        font-weight: 500;

        span {
            font-size: 13px;
            font-weight: 400;
        }
    }

    .form-check .form-check-label {
        margin-left: 20px;
    }

    .form-group textarea {
        width: 100%;
    }

    .bottom {
        display: flex;
        justify-content: space-around;

        input {
            width: 70px;
            margin
        }
    }
    .bottom button {
        display: flex;
        justify-content: space-between;
        width: 80%;
        padding: 5px 15px;
        height: 38px;
    }
`;

const PizzaForm = () => {
    const initialState = {
        name: "",
        size: "",
        sauce: "",
        toppings: [],
        substitute: false,
        special: "",
        quantity: 1
    }
    const [order, setOrder] = useState(initialState);
    const [toppings, setToppings] = useState([]);
    const [errors, setErrors] = useState({
        name: "",
        size: "",
        sauce: "",
        toppings: "",
        substitute: "",
        special: "",
        quantity: ""
    });
    const [post, setPost] = useState({});

    const FormSchema = yup.object().shape({
        name: yup.string().required("Please Enter your name"),
        size: yup.string().required("Please Select a Size"),
        sauce: yup.string().required("Please Select a Sauce"),
        toppings: yup.string(),
        substitute: yup.boolean().oneOf([true, false]),
        special: yup.string(),
        quantity: yup.number().min(1, "Please add quantity")
    })

    const validateChange = e => {
        yup.reach(FormSchema, e.target.name)
            .validate(e.target.name !== "substitute" ? e.target.value : e.target.checked)
            .then(() => {
                setErrors({...errors, [e.target.name]: ""});
            })
            .catch(err => setErrors({...errors, [e.target.name]: err.errors[0]}));
    }

    const handleChange = e => {
        e.persist();

        if(e.target.name === "toppings" && e.target.checked && order.toppings.length < 10 && e.target.name !== "substitute") {
            order.toppings.push(e.target.value);
            setErrors({...errors, [e.target.name]: ""});
        } else if(e.target.name === "toppings" && !e.target.checked && order.toppings.includes(e.target.value)) {
            order.toppings.splice(order.toppings.indexOf(e.target.value), 1);
        } else if (order.toppings.length === 10 && e.target.name !== "substitute") {
            e.target.checked = false;
            setErrors({...errors, [e.target.name]: "You can only choose up to 10 toppings"})
        }
        
        //console.log(order.toppings);

        const newOrder = {
            ...order,
            [e.target.name]: e.target.name !== "toppings" && e.target.name !== "substitute" ? e.target.value : e.target.name === "substitute" ? e.target.checked : order.toppings
        };

        console.log(newOrder);
        validateChange(e);
        setOrder(newOrder);
    }

    const submitOrder = e => {
        e.preventDefault();

        FormSchema.isValid(order)
            .then(valid => {

                if(!valid) {
                    setErrors({...errors, 
                        name: "Enter a name",
                        size: "Choose a size",
                        sauce: "Choose a sauce",
                        toppings: "",
                        substitute: "",
                        special: "",
                        quantity: ""
                    })
                } else {
                axios.post("https://reqres.in/api/order", order)
                    .then(response => {
                        console.log(response.data);
                        setPost(response.data);
                        setOrder(initialState);
                    })
                }

                
            })
    }


    return (
        <PizzaOrder className="pizza-order">
            <h2>Build Your Own Pizza</h2>
            <img className="pizza-header-img" src={pizza} alt="pizza" width="100%" height="200" />

            <h3>Build Your Own Pizza</h3>
            <Form onSubmit = {submitOrder}>
                <FormGroup>
                    <Label className = "inputLabel" htmlFor="name">
                        Enter Your Name<br />
                        <span className = {errors.name.length > 0 ? "errorMessage" : "error"}>{errors.name.length > 0 ? errors.name : "Required"}</span>
                    </Label>
                    <Input type="text" name="name" id="name" value = {order.name} onChange = {handleChange} placeholde = "Name" />
                </FormGroup>

                <FormGroup>
                    <Label className = "inputLabel" htmlFor="size">
                        Choice of Size<br />
                        <span className = {errors.size.length > 0 ? "errorMessage" : "error"}>{errors.size.length > 0 ? errors.size : "Required"}</span>
                    </Label>
                    <Input type="select" name="size" id="size" value = {order.size} onChange = {handleChange}>
                        <option value="">Select</option>
                        <option>Small (10")</option>
                        <option>Medium (12")</option>
                        <option>Large (14")</option>
                    </Input>
                </FormGroup>


                <FormGroup tag = "fieldset">
                    <Label className = "inputLabel">
                        Choice of Sauce<br />
                        <span className = {errors.sauce.length > 0 ? "errorMessage" : "error"}>{errors.sauce.length > 0 ? errors.sauce : "Required"}</span>
                    </Label>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="sauce" value = "Original Red" onChange = {handleChange} />
                            Original Red
                        </Label><br />
                        <Label check>
                            <Input type="radio" name="sauce" value = "Garlic Ranch" onChange = {handleChange} />
                            Garlic Ranch
                        </Label><br />
                        <Label check>
                            <Input type="radio" name="sauce" value = "BBQ Sauce" onChange = {handleChange} />
                            BBQ Sauce
                        </Label><br />
                        <Label check>
                            <Input type="radio" name="sauce" value = "Spinach Alfredo" onChange = {handleChange} />
                            Spinach Alfredo
                        </Label><br />
                    </FormGroup>


                    <FormGroup>
                        <Label className = "inputLabel">
                            Add Toppings<br />
                            <span className = {errors.toppings.length > 0 ? "errorMessage" : "error"}>{errors.toppings.length > 0 ? errors.toppings : "Choose Up to 10."}</span>
                        </Label>

                        <CustomInput id = "pepperoni" type="checkbox" value="Pepperoni" name = "toppings" label="Pepperoni" onChange = {handleChange} />
                        <CustomInput id="sausage" type="checkbox" value="Sausage" name = "toppings" label="Sausage" onChange = {handleChange} />
                        <CustomInput id="bacon" type="checkbox" value="Canadian Bacon" name = "toppings" label="Canadian Bacon" onChange = {handleChange}/>
                        <CustomInput id="italianSausage" type="checkbox" value="Spicy Italian Sausage" name = "toppings" label="Spicy Italian Sausage" onChange = {handleChange}/>
                        <CustomInput id="chicken" type="checkbox" value="Grilled Chicken" name = "toppings" label="Grilled Chicken" onChange = {handleChange}/>
                        <CustomInput id="onions" type="checkbox" value="Onions" name = "toppings" label="Onions" onChange = {handleChange}/>
                        <CustomInput id="pepper" type="checkbox" value="Green Pepper" name = "toppings" label="Green Pepper" onChange = {handleChange} />
                        <CustomInput id="tomatoes" type="checkbox" value="Diced Tomatoes" name = "toppings" label="Diced Tomatoes" onChange = {handleChange}/>
                        <CustomInput id="olives" type="checkbox" value="Black Olives" name = "toppings" label="Black Olives" onChange = {handleChange}/>
                        <CustomInput id="garlic" type="checkbox" value="Roasted Garlic" name = "toppings" label="Roasted Garlic" onChange = {handleChange}/>
                        <CustomInput id = "artichoke" type="checkbox" value="Artichoke Hearts" name = "toppings" label="Artichoke Hearts" onChange = {handleChange}/>
                        <CustomInput id = "threeCheese" type="checkbox" value="Three Cheese" name = "toppings" label="Three Cheese" onChange = {handleChange}/>
                        <CustomInput id = "pineapple" type="checkbox" value="Pineapple" name = "toppings" label="Pineapple" onChange = {handleChange}/>
                        <CustomInput id = "extraCheese" type="checkbox" value="Extra Cheese" name = "toppings" label="Extra Cheese" onChange = {handleChange}/>
                    </FormGroup>
                    
                </FormGroup>

                <FormGroup>
                    <Label className = "inputLabel" htmlFor = "substitute">
                        Choice of Substitute<br />
                        <span>Choose up to 1</span>
                    </Label>
                    <CustomInput type = "switch" id = "substitute" name = "substitute" label = "Gluten Free Crust (+ $1.00)" onChange = {handleChange} checked = {order.substitute} />
                    
                </FormGroup>

                <FormGroup>
                    <Label className = "inputLabel" htmlFor = "special">
                        Special Instructions
                    </Label>
                    <textarea id = "special" name = "special" placeholder = "Anything else you'd like to add?" value = {order.special} onChange = {handleChange}/>
                    
                </FormGroup>


                <FormGroup className = "bottom">
                    <Input type = "number" id = "quantity" name = "quantity" placeholder = "1" value = {order.quantity} onChange = {handleChange}/>
                    <Button><p>Add to Order</p><p>${17.99 * order.quantity}</p></Button>
                </FormGroup>
            </Form>
            <pre>{JSON.stringify(post, null, 2)}</pre>
        </PizzaOrder>
    );
};

export default PizzaForm;