import React, {useState} from 'react';
import {View, Text, Button, TextInput, Alert} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import firebase from "firebase";
import "firebase/firestore";

import {globalStyles} from "../../styles/Global";
import FlatButton from "../../shared/FlatButton";

const reviewSchema = yup.object(
    {
        Name: yup.string().required(),
        Email: yup.string().email("Enter a valid email").required("Required"),
        Password: yup.string().required().min(8, "Password too short..."),
        PhoneNo: yup.number().required(),
        ConfirmPassword: yup
        .string()
        .required("Please confirm your password")
        .when("Password", {
          is: Password => (Password && Password.length > 0 ? true : false),
          then: yup.string().oneOf([yup.ref("Password")], "Password doesn't match")
        })
    }
);

export default function Register() {
    
    return (
        <View style = {globalStyles.container}>
            <Formik
                initialValues = {{Name: "", Email: "", Password: "", ConfirmPassword: "", PhoneNo: ""}}
                validationSchema = {reviewSchema}
                onSubmit = {
                    (values, actions) =>
                    {
                        firebase.auth().createUserWithEmailAndPassword(values.Email, values.Password)
                        .then(
                            (result) =>
                            {
                                firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set(
                                    {
                                        name: values.Name,
                                        email: values.Email,
                                        phone: values.PhoneNo
                                    }
                                );
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
                                placeholder = "Name"
                                onChangeText = {props.handleChange("Name")}
                                value = {props.values.Name}
                                onBlur = {props.handleBlur("Name")}
                            />
                            <Text style = {globalStyles.errorText}>{props.touched.Name && props.errors.Name}</Text>

                            <TextInput
                                style = {globalStyles.input}
                                placeholder = "Phone No."
                                onChangeText = {props.handleChange("PhoneNo")}
                                value = {props.values.PhoneNo}
                                onBlur = {props.handleBlur("PhoneNo")}
                            />
                            <Text style = {globalStyles.errorText}>{props.touched.PhoneNo && props.errors.PhoneNo}</Text>

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

                            <TextInput
                                style = {globalStyles.input}
                                placeholder = "Confirm Password"
                                onChangeText = {props.handleChange("ConfirmPassword")}
                                value = {props.values.ConfirmPassword}
                                secureTextEntry = {true}
                                onBlur = {props.handleBlur("ConfirmPassword")}
                            />
                            <Text style = {globalStyles.errorText}>{props.touched.ConfirmPassword && props.errors.ConfirmPassword}</Text>

                            {/* <Button
                                title = "Sign up"
                                color = "maroon"
                                onPress = {props.handleSubmit}
                            /> */}
                            <FlatButton text = "Sign Up" onPress = {props.handleSubmit} />

                        </View>
                    )
                }
            </Formik>
        </View>
    )
}
