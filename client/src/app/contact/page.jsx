export default function Contact() {
  return (
    <div className="grid grid-cols-2 gap-x-24 gap-y-24 md:gap-y-8 container-lg" x-data="" x-init="$store.header.colorScheme = 'dark'">
      <h1 className="order-1 col-span-2 mt-0 font-medium leading-tight text-left uppercase md:col-span-1">We are always open for collaborations, suggestions, questions or simply a friendly talk.</h1>
      <div className="order-2 col-span-2 md:order-3 md:col-span-1">
        <form method="post" action="/contact#contact_form" id="contact_form" acceptCharset="UTF-8" className="contact-form">
          <input type="hidden" name="form_type" value="contact" />
          <input type="hidden" name="utf8" value="✓" />

          <div className="mb-4">
            <label htmlFor="ContactFormName">
              Name, Surname
            </label>
            <input className="w-full" type="text" id="ContactFormName" name="contact[name]" />
          </div>
          <div className="mb-4">
            <label htmlFor="ContactFormEmail">
              E-Mail Address
            </label>
            <input className="w-full" type="email" id="ContactFormEmail" name="contact[email]" />
          </div>
          {/* Uncomment this section if you want to include phone number input
          <div className="mb-4">
            <label htmlFor="ContactFormPhone">
              Phone number
            </label>
            <input
              className="w-full"
              type="tel"
              id="ContactFormPhone"
              name="contact[phone]"
            />
          </div>
          */}
          <div className="mb-4">
            <label htmlFor="ContactFormMessage">
              Message
            </label>
            <textarea className="w-full" rows="10" id="ContactFormMessage" name="contact[body]" value="" />
          </div>
          <input className="w-full btn-primary" type="submit" value="Send message" />

        </form>
      </div>
      <h1 className="order-3 col-span-2 mt-0 font-medium leading-tight text-left uppercase larger md:order-2 md:col-span-1">Find us on Fuerteventura and come say hello!</h1>
      <div className="order-4 col-span-2 md:col-span-1">

        <div className="mb-12">
          <h4 className="mb-2 uppercase">Headquarter &amp; Shop</h4>
          <div className="mb-2 text-lg">
            <p>Calle los quemados s/n, <br />35650 Lajares</p>
          </div>
          <a className="text-lg font-bold no-underline" href="tel:+34 928 86 86 51">+34 928 86 86 51</a>
        </div>

        <div className="mb-12">
          <h4 className="mb-2 uppercase">Shop El Cotillo</h4>
          <div className="mb-2 text-lg">
            <p>Calle del Muelle de Pescadores, 11, <br />35650 El Cotillo</p>
          </div>
          <a className="text-lg font-bold no-underline" href="tel:+34 928 71 91 57">+34 928 71 91 57</a>
        </div>

        <div className="mb-12">
          <h4 className="mb-2 uppercase">Shop Corralejo</h4>
          <div className="mb-2 text-lg">
            <p>Calle Playa Cho Leon, <br />35660 Corralejo</p>
          </div>
          <a className="text-lg font-bold no-underline" href="tel:+34 928 86 62 91">+34 928 86 62 91</a>
        </div>

      </div>
    </div>
  );
}
