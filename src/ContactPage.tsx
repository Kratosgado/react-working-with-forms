import { useNavigate } from 'react-router-dom';
import { useForm, FieldError } from 'react-hook-form';
import { ValidationError } from './ValidationError';

type Contact = {
   name: string;
   email: string;
   reason: string;
   notes: string;
}

export function ContactPage() {
   const { register, handleSubmit, formState: { errors } } = useForm<Contact>({
      mode: "onBlur",
      reValidateMode: "onBlur",
   });
   const navigate = useNavigate();

   function onSubmit(contact: Contact) {
      console.log('Submitted details: ', contact);
      navigate(`/thank-you/${contact.name}`)
   }

   function getEditorStyle(fieldError: FieldError | undefined) {
      return fieldError ? 'border-red-500 border-2' : '';
   }

   const fieldStyle = "flex flex-col mb-2 border-2";
   return (
      <div className="flex flex-col py-10 max-w-md mx-auto">
         <h2 className="text-3x1 font-bold underline mb-3">Contact Us</h2>
         <p className="mb-3">
            If you enter your details we'll get back to you as soon as we can.
         </p>
         <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className={fieldStyle}>
               <label htmlFor="name">Your name</label>
               <input
                  className={getEditorStyle(errors.name)}
                  type="text"
                  id="name"
                  {...register('name', {
                     required: 'You must enter your name'
                  })}
               />
               <ValidationError fieldError={errors.name} />
            </div>
            <div className={fieldStyle}>
               <label htmlFor="email">Your email address</label>
               <input
                  className={getEditorStyle(errors.email)}
                  type="email"
                  id="email"
                  {...register('email', {
                     required: "You must enter your email address",
                     pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                     }
                  })}
                  // pattern="\S+@\S+\.\S+"
               />
               <ValidationError fieldError={errors.email} />
            </div>
            <div className={fieldStyle}>
               <label htmlFor="reason">Reason you need to contact us</label>
               <select id="reason"
                  className={getEditorStyle(errors.reason)}
                  {...register('reason', {
                     required: "You must select one of the reasons"
                  })}
               >
                  <option value=""></option>
                  <option value="Support">Support</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
               </select>
               <ValidationError fieldError={errors.reason} />
            </div>
            <div className={fieldStyle}>
               <label htmlFor="notes">Additional notes</label>
               <textarea id="notes" {...register('notes')}
               />
            </div>
            <div>
               <button type="submit" className="mt-2 h-10 px-6 font-semibold bg-black text-white">
                  Submit
               </button>
            </div>
         </form>
      </div>
   )
}