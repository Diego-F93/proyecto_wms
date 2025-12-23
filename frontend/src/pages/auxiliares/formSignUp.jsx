import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Api } from "../../utils/apiHelper";
import Modal from "./Modal";

export default function SignUpForm({ open, onClose, onSubmit}) {
    const [form, setForm] = useState(
        {
            email: "",
            password: "",
            password2: "",
            first_name: "",
            last_name: "",
            rut: "",

        }
    )
}