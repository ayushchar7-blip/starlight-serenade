import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type Props = {
  expectedDate: string; // format: MMDD or YYYY-MM-DD; we'll be lenient
  hint?: string;
  onUnlock: () => void;
};

// Set this to manually override the password without editing parent files
const MANUAL_PASSWORD: string | undefined = undefined;

function normalize(v: string) {
  return v.replace(/[^0-9]/g, "");
}

export default function PasswordGate({ expectedDate, hint, onUnlock }: Props) {
  const 
