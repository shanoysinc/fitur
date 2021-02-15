import { Schema, Document, model, models } from "mongoose";

interface User extends Document {
	name: string;
	role: "admin" | "voter";
}
