import { useState } from "react";
import contact_2 from "../assets/contact_2.png";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

const defaultContactForm = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [contact, setContact] = useState(defaultContactForm);
  //To GET the data
  const [userData, setUserData] = useState(true);
  const { user } = useAuth();

  // this logic is to retrive by default get data
  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
    // console.log("Contact",contact);
  }
  //else{
  //     console.log("User data not available");
  // }

  const handleloginInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Contact Data: ", data.message);
        toast.success("Message Send succesfully!");
        setContact(defaultContactForm);
      }
      console.log("Response: ", response);
    } catch (error) {
      console.log("Contact data error ", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="bg-slate-900 min-h-screen text-white max-w-full px-16 py-4">
            <div className=" container flex justify-center">
              <div className="m-40">
                <img
                  src={contact_2}
                  alt=""
                  className="w-96 h-96 transform scale-150"
                />
              </div>

              <div className="">
                <h1 className="text-6xl font-bold p-10">Contact Us</h1>
                <form
                  action=""
                  onSubmit={handleSubmit}
                  className="text-2xl p-7"
                >
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      value={contact.username}
                      onChange={handleloginInput}
                      type="username"
                      name="username"
                      required
                      autoComplete="off"
                      placeholder="Enter your  Username"
                      className="rounded-sm text-black px-2 w-full"
                    />
                  </div>

                  <div className="py-10">
                    <label htmlFor="email">Email</label>
                    <input
                      value={contact.email}
                      onChange={handleloginInput}
                      type="email"
                      name="email"
                      required
                      autoComplete="off"
                      placeholder="Enter your Email"
                      className="rounded-sm text-black px-2 w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message">Message</label>
                    <input
                      value={contact.message}
                      onChange={handleloginInput}
                      type="text"
                      name="message"
                      required
                      autoComplete="off"
                      placeholder="Enter your  message"
                      className="rounded-sm text-black px-2 w-full "
                    />
                  </div>

                  <div className="py-8">
                    <button
                      type="submit"
                      className="bg-slate-600 p-2 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
