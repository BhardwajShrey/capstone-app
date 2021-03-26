import React, {useState, useEffect} from "react";
import {View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import firebase from "firebase";

import {globalStyles} from "../styles/Global";
import FlatButton from "../shared/FlatButton";

require("firebase/firestore");
require("firebase/firebase-storage");

const complaintSchema = yup.object(
    {
        Title: yup.string().required(),
        Complaint: yup.string().required(),
        Location: yup.string().required()
    }
);
// test function arguments = (name given to test, error message to be displayed, function to validate against)

export default function ComplaintForm({navigation, route})
{
    const [images, setImages] = useState([]);
    const [currRoute, setCurrRoute] = useState(route);

    const uploadImages = async (image) =>
    {
        const res = await fetch(image);
        const blob = await res.blob();

        const task = firebase.storage().ref().child(`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`).put(blob);

        const taskProgress = snapshot =>
        {
            console.log(`transferred: ${snapshot.bytesTransferred}`);
        }

        const taskCompleted = () =>
        {
            task.snapshot.ref.getDownloadURL().then(
                (snapshot) =>
                {
                    // console.log(snapshot);
                    return snapshot
                }
            )
        }

        const taskError = snapshot =>
        {
            // console.log(snapshot);
            return snapshot;
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const uploadData = () =>
    {
        const imagesUploaded = images.map(uploadImages);
        console.log(imagesUploaded);
    }

    useEffect(
        () =>
        {
            // console.log(images);
            if(route !== currRoute && route.params?.image)
            {
                setImages(
                    (currentImages) =>
                    {
                        return [...currentImages, route.params.image]
                    }
                );

                setCurrRoute(route);
            }
            
        }, [route]
    );

    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
            <View style = {globalStyles.container}>
                    <Formik
                        initialValues = {{Title: "", Complaint: "", Location: ""}}
                        validationSchema = {complaintSchema}
                        onSubmit = {
                            (values, actions) =>
                            {
                                actions.resetForm();
                                // console.log(images);
                                uploadData(values);
                                setImages([]);
                            }
                        }
                    >
                        {
                            (props) =>
                            (
                                <View>
                                    <TextInput
                                        style = {globalStyles.input}
                                        placeholder = "Title of your complaint"
                                        onChangeText = {props.handleChange("Title")}
                                        value = {props.values.Title}
                                        onBlur = {props.handleBlur("Title")}
                                    />
                                    <Text style = {globalStyles.errorText}>{props.touched.Title && props.errors.Title}</Text>

                                    <TextInput
                                        multiline
                                        minHeight = {120}
                                        style = {globalStyles.input}
                                        placeholder = "Complaint in detail..."
                                        onChangeText = {props.handleChange("Complaint")}
                                        value = {props.values.Complaint}
                                        onBlur = {props.handleBlur("Complaint")}
                                    />
                                    <Text style = {globalStyles.errorText}>{props.touched.Complaint && props.errors.Complaint}</Text>

                                    <TextInput
                                        style = {globalStyles.input}
                                        placeholder = "Location"
                                        onChangeText = {props.handleChange("Location")}
                                        value = {props.values.Location}
                                        onBlur = {props.handleBlur("Location")}
                                    />
                                    <Text style = {globalStyles.errorText}>{props.touched.Location && props.errors.Location}</Text>

                                    {/* <Button
                                        title = "Add images (optional)"
                                        color = "maroon"
                                        onPress = {() => navigation.navigate("AddImage")}
                                    /> */}
                                    <Button
                                        title = "Add images..."
                                        color = "#5863f8"
                                        onPress = {() => navigation.navigate("AddImage")}
                                    />
                                    <Text style = {globalStyles.errorText}>Images attached: {images.length}</Text>
                                    <FlatButton text = "Submit" onPress = {props.handleSubmit} />
                                </View>
                            )
                        }
                    </Formik>
            </View>
        </TouchableWithoutFeedback>
    );
}