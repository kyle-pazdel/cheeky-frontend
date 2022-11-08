export function UsersUpdate(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    handleUpdateUser;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        First Name: <input defaultValue={props.user.first_name} name="name" type="text" />
      </div>
      <div>
        Last Name: <input defaultValue={props.user.last_name} name="width" type="text" />
      </div>
      <div>
        Email: <input defaultValue={props.user.email} name="width" type="text" />
      </div>
      <div>
        Phone Number: <input defaultValue={props.user.phone_number} name="width" type="text" />
      </div>
      <button type="submit">Update Account Details</button>
    </form>
  );
}
