import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import "primeflex/themes/primeone-light.css";

import Aura from "@primevue/themes/aura";

import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Message from "primevue/message";
import Password from "primevue/password";
import Tag from "primevue/tag";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";
import MultiSelect from "primevue/multiselect";
import DatePicker from "primevue/datepicker";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import ProgressBar from "primevue/progressbar";
import Slider from "primevue/slider";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import AutoComplete from "primevue/autocomplete";
import ConfirmPopup from "primevue/confirmpopup";
import RadioButton from "primevue/radiobutton";
import TieredMenu from "primevue/tieredmenu";
import PanelMenu from "primevue/panelmenu";
import Checkbox from "primevue/checkbox";
import Textarea from "primevue/textarea";
import Chart from "primevue/chart";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(PrimeVue);
app.use(router);
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.use(createPinia());

app.component("InputText", InputText);
app.component("IconField", IconField);
app.component("InputIcon", InputIcon);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("Message", Message);
app.component("Password", Password);
app.component("Tag", Tag);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("MultiSelect", MultiSelect);
app.component("DatePicker", DatePicker);
app.component("InputNumber", InputNumber);
app.component("Select", Select);
app.component("ProgressBar", ProgressBar);
app.component("Slider", Slider);
app.component("Calendar", Calendar);
app.component("Dialog", Dialog);
app.component("AutoComplete", AutoComplete);
app.component("ConfirmPopup", ConfirmPopup);
app.component("RadioButton", RadioButton);
app.component("TieredMenu", TieredMenu);
app.component("PanelMenu", PanelMenu);
app.component("Checkbox", Checkbox);
app.component("Textarea", Textarea);
app.component("Chart", Chart);

app.mount("#app");
