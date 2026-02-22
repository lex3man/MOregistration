/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  CheckIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { loginRequest } from "./features/login-request";
import { InvisibleCaptcha } from "./features/capcha";

export function RegForm() {
  const [login, setLogin] = useState("");
  const [loginChecked, setLoginChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [name, setName] = useState("");
  const [nameChecked, setNameChecked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(nameChecked && emailChecked && loginChecked && phoneChecked);
  }, [nameChecked, emailChecked, loginChecked, phoneChecked]);

  useEffect(() => {
    const available = async () => {
      return await loginRequest(login);
    };
    if (login.length > 2) {
      available().then((res) => {
        if (res) {
          setLoginChecked(true);
        } else {
          setLoginChecked(false);
        }
      });
    } else {
      setLoginChecked(false);
    }
  }, [login]);

  useEffect(() => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      setEmailChecked(true);
    } else {
      setEmailChecked(false);
    }
  }, [email]);

  useEffect(() => {
    if (phone.length > 9) {
      setPhoneChecked(true);
    } else {
      setPhoneChecked(false);
    }
  }, [phone]);

  useEffect(() => {
    if (name.length > 1) {
      setNameChecked(true);
    } else {
      setNameChecked(false);
    }
  }, [name]);

  const handleSubmit = () => {
    if (checked) {
      toast.success("Ваш запрос отправлен");
      console.log(name, email, login, phone);
      console.log("submit");
    } else {
      toast.error("Пожалуйста, проверьте все поля");
    }
  };

  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput
          placeholder="Ваше имя"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <InputGroupAddon>
          <UserIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {nameChecked ? (
            <CheckIcon className="h-6 w-6 text-green-500" />
          ) : (
            <XIcon className="h-6 w-6 text-red-400" />
          )}
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput
          type="email"
          placeholder="Ваш email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {emailChecked ? (
            <CheckIcon className="h-6 w-6 text-green-500" />
          ) : (
            <XIcon className="h-6 w-6 text-red-400" />
          )}
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput
          placeholder="Логин в системе"
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <InputGroupAddon>
          <ShieldIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {loginChecked ? (
            <CheckIcon className="h-6 w-6 text-green-500" />
          ) : (
            <XIcon className="h-6 w-6 text-red-400" />
          )}
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput
          type="tel"
          placeholder="Номер телефона"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <InputGroupAddon>
          <PhoneIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {phoneChecked ? (
            <CheckIcon className="h-6 w-6 text-green-500" />
          ) : (
            <XIcon className="h-6 w-6 text-red-400" />
          )}
        </InputGroupAddon>
      </InputGroup>

      <InvisibleCaptcha />

      <Button type="submit" className="w-full" onClick={handleSubmit}>
        Зарегистрироваться
      </Button>
    </div>
  );
}
