import React, {useState} from 'react';
import {View, Text, Button, TextInput} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import firebase from "firebase";

import {globalStyles} from "../../styles/Global";
import FlatButton from "../../shared/FlatButton";

const reviewSchema = yup.object(
    {
        Email: yup.string().email("Enter a valid email").required("Required"),
        Password: yup.string().required().min(8, "Password too short...")
    }
);

export default function Login() {

    return (
        <View style = {globalStyles.container}>
            <Formik
                initialValues = {{Email: "", Password: ""}}
                validationSchema = {reviewSchema}
                onSubmit = {
                    (values, actions) =>
                    {
                        firebase.auth().signInWithEmailAndPassword(values.Email, values.Password)
                        .then(
                            (result) =>
                            {
                                console.log(result);
                            }
                        )
                        .catch(
                            (result) =>
                            {
                                console.error(result);
                            }
                        );

                        actions.resetForm();
                    }
                }
            >
                {
                    (props) =>
                    (
                        <View>
                            <TextInput
                                style = {globalStyles.input}
                                placeholder = "Email"
                                onChangeText = {props.handleChange("Email")}
                                keyboardType = "email-address"
                                value = {props.values.Email}
                                onBlur = {props.handleBlur("Email")}
                            />
                            <Text style = {globalStyles.errorText}>{props.touched.Email && props.errors.Email}</Text>
                            
                            <TextInput
                                style = {globalStyles.input}
                                placeholder = "Password"
                                onChangeText = {props.handleChange("Password")}
                                value = {props.values.Password}
                                secureTextEntry = {true}
                                onBlur = {props.handleBlur("Password")}
                            />
                            <Text style = {globalStyles.errorText}>{props.touched.Password && props.errors.Password}</Text>

                            {/* <Button
                                title = "Sign up"
                                color = "maroon"
                                onPress = {props.handleSubmit}
                            /> */}
                            <FlatButton text = "Sign in" onPress = {props.handleSubmit} />

                        </View>
                    )
                }
            </Formik>
        </View>
    )
}
