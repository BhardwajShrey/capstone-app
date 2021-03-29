import React, {useState, useEffect} from "react";
import {View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert} from "react-native";
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

    const uploadData = (values, storageURL = null) =>
    {
        // console.log(values);
        // console.log(storageURL);
        firebase.firestore().collection("posts").doc(firebase.auth().currentUser.uid).collection("userPosts").add(
            {
                image: storageURL,
                body: values.Complaint,
                title: values.Title,
                location: values.Location,
                creation: firebase.firestore.FieldValue.serverTimestamp(),
                comments: "",
                status: "Processing",
                type: ["stray animals", "water logging", "encroachment"]
            }
        ).then(
            (
                function()
                {
                    console.log("Record created...");
                }
            )
        );
    }

    const uploadToStorage = async (values) =>
    {
        if(images.length !== 0)
        {
            const res = await fetch(images[0]);
            const blob = await res.blob()
            const task = firebase.storage().ref().child(`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`).put(blob)
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
                        uploadData(values, snapshot);
                    }
                )
            }
        
            const taskError = snapshot =>
            {
                console.log(snapshot);
            }
        
            task.on("state_changed", taskProgress, taskError, taskCompleted);
        }
        else
        {
            uploadData(values);
        }
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

    var addImageButton = null;
    var imagesAttached = null;

    if(images.length !== 0)
    {
        addImageButton = (
            <Button
                title = "Add an image..."
                color = "#5863f8"
                onPress = {() => Alert.alert("Image already added", "Cannot add more than one image", [{text: "Okay"}])}
            />
        );
        imagesAttached = (
            <Text style = {globalStyles.errorText}>One image attached.</Text>
        );
    }
    else
    {
        addImageButton = (
            <Button
                title = "Add an image..."
                color = "#5863f8"
                onPress = {() => navigation.navigate("AddImage")}
            />
        );
        imagesAttached = null;
    }
    

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
                                uploadToStorage(values);
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
                                    {addImageButton}
                                    {imagesAttached}
                                    <FlatButton text = "Submit" onPress = {props.handleSubmit} />
                                </View>
                            )
                        }
                    </Formik>
            </View>
        </TouchableWithoutFeedback>
    );
}