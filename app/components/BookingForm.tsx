import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  checkIn: z.date().refine(date => date >= new Date(), 'Check-in date must be in the future'),
  checkOut: z.date().refine((date, context) => {
    if (!date) return true; // no check-out date entered
    const { checkIn } = context.parent;
    return date > checkIn || 'Check-out date must be after check-in date';
  }),
});

const BookingForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
    // handle booking submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input type="text" {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Check-in Date</label>
        <input type="date" {...register('checkIn')} />
        {errors.checkIn && <span>{errors.checkIn.message}</span>}
      </div>
      <div>
        <label>Check-out Date</label>
        <input type="date" {...register('checkOut')} />
        {errors.checkOut && <span>{errors.checkOut.message}</span>}
      </div>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;