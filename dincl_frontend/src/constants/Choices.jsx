  export const AGE_CHOICES = [
    { value: "<18", label: "<18" },
    { value: "18-40", label: "18-40" },
    { value: "41-60", label: "41-60" },
    { value: ">60", label: ">60" },
  ];
  
  export const GENDER_CHOICES = [
    { value: "K", label: "K" },
    { value: "M", label: "M" },
    { value: "Nie chcę podać", label: "Nie chcę podać" },
  ];
  
  export const CITY_SIZE_CHOICES = [
    { value: "małe", label: "małe" },
    { value: "średnie", label: "średnie" },
    { value: "duże", label: "duże" },
  ];
  
  export const VOIVODSHIP_CHOICES = [
    { value: "dolnośląskie", label: "dolnośląskie" },
    { value: "kujawsko-pomorskie", label: "kujawsko-pomorskie" },
    { value: "lubelskie", label: "lubelskie" },
    { value: "lubuskie", label: "lubuskie" },
    { value: "łódzkie", label: "łódzkie" },
    { value: "małopolskie", label: "małopolskie" },
    { value: "mazowieckie", label: "mazowieckie" },
    { value: "opolskie", label: "opolskie" },
    { value: "podkarpackie", label: "podkarpackie" },
    { value: "podlaskie", label: "podlaskie" },
    { value: "pomorskie", label: "pomorskie" },
    { value: "śląskie", label: "śląskie" },
    { value: "świętokrzyskie", label: "świętokrzyskie" },
    { value: "warmińsko-mazurskie", label: "warmińsko-mazurskie" },
    { value: "wielkopolskie", label: "wielkopolskie" },
    { value: "zachodniopomorskie", label: "zachodniopomorskie" },
  ];
  
  export const GROUP_CHOICES = [
    { value: "Moi znajomi", label: "Moi znajomi" },
    { value: "Moi koledzy/koleżanki w szkole/na uczelni", label: "Moi koledzy/koleżanki w szkole/na uczelni" },
    { value: "Moja praca", label: "Moja praca" },
    { value: "Mój region", label: "Mój region" },
    { value: "Mój kraj", label: "Mój kraj" },
  ];
  
  export const RATING_CHOICES = Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: String(i + 1) }));

  export const FORM_FIELDS = [
    { name: "age", label: "Wiek", choices: AGE_CHOICES },
    { name: "gender", label: "Płeć", choices: GENDER_CHOICES },
    {
        name: "voivodship",
        label: "Województwo",
        choices: VOIVODSHIP_CHOICES,
    },
    { name: "city_size", label: "Miasto", choices: CITY_SIZE_CHOICES },
    { name: "group", label: "Grupa", choices: GROUP_CHOICES },
    {
        name: "identification_with_group",
        label: "Identyfikacja z grupą",
        choices: RATING_CHOICES,
    },
    {
        name: "identification_with_minority",
        label: "Identyfikacja z mniejszością",
        choices: RATING_CHOICES,
    },
    {
        name: "group_diversity",
        label: "Zróżnicowanie grupy",
        choices: RATING_CHOICES,
    },
    {
        name: "ease_of_joining",
        label: "Łatwość dołączania",
        choices: RATING_CHOICES,
    },
    {
        name: "rule_fairness",
        label: "Sprawiedliwość zasad",
        choices: RATING_CHOICES,
    },
    {
        name: "minority_participation_in_life",
        label: "Udział mniejszości w życiu",
        choices: RATING_CHOICES,
    },
    {
        name: "minority_participation_in_decisions",
        label: "Udział mniejszości w decyzjach",
        choices: RATING_CHOICES,
    },
    {
        name: "minority_potential_utilization",
        label: "Wykorzystanie potencjału mniejszości",
        choices: RATING_CHOICES,
    },
    {
        name: "personal_security_feeling",
        label: "Poczucie bezpieczeństwa osobistego",
        choices: RATING_CHOICES,
    },
    {
        name: "minority_security_feeling",
        label: "Poczucie bezpieczeństwa mniejszości",
        choices: RATING_CHOICES,
    },
];