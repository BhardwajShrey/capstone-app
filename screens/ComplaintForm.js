import React, {useState, useEffect} from "react";
import {View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";

import {globalStyles} from "../styles/Global";
import FlatButton from "../shared/FlatButton";

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
    var lastImage = null;

    useEffect(
        () =>
        {
            console.log(images);
            if(route.params?.image && route.params.image !== lastImage)
            {
                lastImage = route.params.image;
                console.log(lastImage);

                if(lastImage !== images[images.length - 1])
                {
                    setImages(
                        (currentImages) =>
                        {
                            return [...currentImages, lastImage]
                        }
                    );
                }
            }
        }
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
                                setImages([]);
                                console.log(values);
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