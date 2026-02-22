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

interface Props {
  completeSetter: (s: boolean) => void;
}

export function RegForm(props: Props) {
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

  const handleSubmit = async () => {
    if (checked) {
      const request = {
        "name": name,
        "email": email,
        "login": login,
        "phone": phone
      }
      const r = await fetch("/api/registration", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })
      if (r.status === 200) {
        toast.success("Вы зарегистрированны, доступ отправлен на указанный вами email");
        props.completeSetter(true)
      } else {
        toast.error("При регистрации возникла ошибка")
        console.log(await r.json())
      }
      
    } else {
      if (!loginChecked) {
        toast.error("Этот логин уже занят! Выберите другой")
      } else {
        toast.error("Пожалуйста, проверьте все поля");
      }
    }
  };

  return (
    <div className="grid w-full max-w-sm gap-6">
      <p className="text-center text-lg text-zinc-600 dark:text-zinc-400">
        Для регистрации заполнение всех полей обязательно
      </p>
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
