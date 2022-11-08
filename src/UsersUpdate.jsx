export function UsersUpdate(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onHideUserForm();
    props.onUpdateUser(props.user.id, params, () => event.target.reset());
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        First Name: <input defaultValue={props.user.first_name} name="first_name" type="text" />
      </div>
      <div>
        Last Name: <input defaultValue={props.user.last_name} name="last_name" type="text" />
      </div>
      <div>
        Email: <input defaultValue={props.user.email} name="email" type="text" />
      </div>
      <div>
        Phone Number: <input defaultValue={props.user.phone_number} name="phone_number" type="text" />
      </div>
      <button type="submit">Update Account Details</button>
    </form>
  );
}
