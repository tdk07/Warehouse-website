import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema } from '../../lib/schemas';
import { supabase } from '../../lib/supabase';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(ContactSchema)
  });

  const onSubmit = async (data) => {
    // Note: For full production, this should call the Edge Function instead of direct insertion
    // Edge function gives us rate limiting. Assuming the edge function is deployed at /functions/v1/contact-submit
    try {
      const response = await supabase.functions.invoke('contact-submit', {
        body: data
      });
      if (response.error) throw response.error;
      
      alert('Thank you! Your inquiry has been submitted.');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit. Please try again later.');
    }
  };

  return (
    <section className="pt-48 pb-32 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="bg-black text-white rounded-[4rem] p-12 md:p-24 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
        <div className="relative z-10">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-12">
            Connect <br /> <span className="text-yellow-500">Global</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-4">
                  Headquarters
                </h4>
                <p className="text-gray-400 font-bold leading-relaxed">
                  Warehouse Plaza, Sector 12-A,
                  <br />
                  Premium Imports Hub, New Delhi,
                  <br />
                  India - 110XXX
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em] mb-4">
                  Direct Support
                </h4>
                <p className="text-2xl font-black">+91 86681 60867</p>
                <p className="text-gray-400 font-bold mt-2 hover:text-yellow-500 cursor-pointer">
                  trade@warehousegroup.co
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-10 md:pt-0">
              <div>
                <input
                  type="text"
                  placeholder="NAME"
                  {...register('name')}
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-yellow-500 text-xs font-black tracking-widest"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="EMAIL"
                  {...register('email')}
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-yellow-500 text-xs font-black tracking-widest"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="PHONE (OPTIONAL)"
                  {...register('phone')}
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-yellow-500 text-xs font-black tracking-widest"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="COMPANY NAME (OPTIONAL)"
                  {...register('company')}
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-yellow-500 text-xs font-black tracking-widest"
                />
              </div>
              
              <div>
                <textarea
                  rows="4"
                  placeholder="DESCRIBE YOUR REQUIREMENT"
                  {...register('message')}
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-yellow-500 text-xs font-black tracking-widest"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-yellow-500 text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
