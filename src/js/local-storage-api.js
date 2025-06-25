import { refs } from "./refs";

refs.form.addEventListener("input", handleInput);

function handleInput(e) {
    const userTask = {
        message: refs.inputName.value,
        task: refs.inputDesc.value
    }
    const value = localStorage.setItem("tasks", JSON.stringify(userTask));
    JSON.parse(value);
}

refs.form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault();


    refs.form.reset()
}


refs.changeTheme.addEventListener("click", handleClick);

function handleClick() {

}