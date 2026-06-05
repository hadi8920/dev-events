import { notFound } from "next/dist/client/components/navigation";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItems = ({icon, alt, label}: {icon: string, alt: string, label: string}) => {
  return (
    <div className="flex flex-row-gap-2 items-center">
      <Image src={icon} alt={alt} width={17} height={17} />
      <p>{label}</p>
    </div>
  )
}
const EventAgenda = ({agendaItems}: {agendaItems : string[]}) => {
  return (
    <div className = "agenda">
      <h2>Event Agenda</h2>
      <ul>
        {agendaItems.map((item) => ( 
          <li key={item}>{item}</li>
        ))}
      </ul>
      
    </div>
  )
}
const EventTags = ({tags}: {tags : string[]}) => {
  return (
    <div className = "flex flex-row-gap-1.5 flex-wrap">
      {tags.map((tag)=>(
        <div className = "pill" key= {tag}>{tag}</div>
      ))}
    </div>
  )
}

const EventDetailsPage = async ({params} : {params : Promise<{slug : string}>}) => {

  const {slug} = await  params;
  const req = await fetch(`${BASE_URL}/api/events/${slug}`)
  const {event : {description  , image , overview , date , time , location , mode , agenda , audience , tags , organizer }} = await req.json(); 

  // if(!event) return notFound();
const bookings = 10;

  
  return (

    <section id="event">
      <div className = "header">
        <h1>Event Description</h1>
        <p className="mt-2">{description}</p>
      </div>

      <div className = "details">
        {/* Left-side */}
        <div className ="content">
          <Image src={image} alt="Event Banner" width ={800} height ={800} className = "banner"/>
          <section className="flex flex-col-gap-2">
            <h2>OVerview</h2>
            <p>{overview}</p>
          </section>
          <section className="flex flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItems icon="/icons/calendar.svg" alt="calender" label ={date}/>
            <EventDetailItems icon="/icons/clock.svg" alt="time" label ={time}/>
            <EventDetailItems icon="/icons/pin.svg" alt="pin" label ={location}/>
            <EventDetailItems icon="/icons/mode.svg" alt="mode" label ={mode}/>
            <EventDetailItems icon="/icons/audience.svg" alt="audience" label ={audience}/>
          </section>

          <EventAgenda agendaItems = {JSON.parse(agenda[0])}/>

          <section className = "flex flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>
          <EventTags tags = {JSON.parse(tags[0])}/>
        </div>
        {/* Right-side */}
        <aside className = "booking">
          <div className="singup-card">
            <h2>Book your Spot!</h2>
            {bookings > 10 ?
              <p className = "text-sm">Join {bookings} people whjo have booked their spot</p>
            :<p className = "text-sm">Be the first to Book</p>}
          </div>
        </aside>
      </div>
    </section>


  )
}

export default EventDetailsPage
