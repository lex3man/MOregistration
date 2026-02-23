"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  CheckIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link"
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
  const [loginStatus, setLoginStatus] = useState(false);
  const [email, setEmail] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [name, setName] = useState("");
  const [nameChecked, setNameChecked] = useState(false);
  const [ofertaChecked, setOfertaChecked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(nameChecked && emailChecked && loginChecked && phoneChecked && ofertaChecked);
  }, [nameChecked, emailChecked, loginChecked, phoneChecked, ofertaChecked]);

  useEffect(() => {
    const available = async () => {
      return await loginRequest(login);
    };
    const re = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
    if (login.length > 2 && login.length < 12 && re.test(login)) {
      setLoginStatus(true)
      available().then((res) => {
        if (res) {
          setLoginChecked(true);
        } else {
          setLoginChecked(false);
        }
      });
    } else {
      setLoginStatus(false)
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
    const re = /^((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/;
    if (re.test(phone)) {
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
        const message = await r.json()
        toast.error(`При регистрации возникла ошибка: ${message}`)
        console.log(message)
      }
      
    } else {
      if (!loginChecked) {
        if (!loginStatus) { 
          toast.error("Логин должен быть от 3 до 12 символов, содержать только латинские буквы и цифры")
        } else { 
          toast.error("Этот логин уже занят! Выберите другой")
        }
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

      <FieldGroup className="mx-auto w-72">
        <Field orientation="horizontal">
          <Checkbox
            id="terms-checkbox-desc"
            name="terms-checkbox-desc"
            checked={ofertaChecked}
            onClick={() => setOfertaChecked(!ofertaChecked)}
          />
          <FieldContent>
            <FieldLabel htmlFor="terms-checkbox-desc">
              Я принимаю условия оферты
            </FieldLabel>
            <FieldDescription>
              Поставив галочку, Вы соглашаетесь с условиями <Link href="https://moiofis.ru/docs/oferta.doc" target="_blank">оферты</Link>
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={!checked} onClick={handleSubmit}>
        Зарегистрироваться
      </Button>

      <FieldGroup className="mx-auto w-96">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldDescription>
              После регистрации вам будет предоставлен тестовый доступ ко всем возможностям сервиса «Мой Офис» на 10 дней. По окончании тестового доступа вы можете продолжить работу, используя платный доступ или отказаться от использования. С ценами можно ознакомиться в разделе <Link href="https://moiofis.ru/index.php?r=site/price" target="_blank">цены</Link> 
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>

    </div>
  );
}
