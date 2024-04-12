import React from "react";


export  const Form = ({handleSubmit,handleonChange,handleClose,rest}) =>{
    return(
        <div className="addconatiner p-5">
            <form action="" className="p-5" onSubmit={handleSubmit}>
              <i
                className="fa-regular fa-circle-xmark  ms-auto"
                onClick={handleClose}
              ></i>
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleonChange}
                value={rest.name}
              />
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleonChange}
                value={rest.email}
              />
              <label htmlFor="name">Mobile :</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                onChange={handleonChange}
                value={rest.mobile}
              />
              <button className="btn btn-success mt-3">Submit</button>
            </form>
          </div>
    )
}