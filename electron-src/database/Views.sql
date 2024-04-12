
	
-- Klasse
SELECT 
	name AS Klasse,
	entry_year AS Einschulungsjahr
	FROM Class;
	
-- Unternehmen
SELECT 
	name AS Unternehmen,
	job_occupation AS Beruf
	FROM Company;
	
-- Event
SELECT 
	name AS Name
	FROM Event;
	
-- Raum
SELECT 
	name AS RaumNummer,
	student_capacity AS Kapazität
	FROM Room;

-- Stundenplan
SELECT 
	timeslot_start AS ZeitStart,
	timeslot_end AS ZeitEnde
	FROM Scheduler;
	
-- Schüler
SELECT 
	Student.firstname AS Name,
	Student.lastname AS Nachname,
	Class.name AS Klasse
	FROM Student
		LEFT OUTER JOIN Class ON Student.class_id = Class.class_id;

-- Studentenwahl
SELECT 
	Student.firstname || ' ' || Student.lastname AS Schüler,
	Company.name || ' ' || Company.job_occupation AS Veranstaltung,
	StudentPreference.priority AS Priorität
	FROM StudentPreference
		LEFT OUTER JOIN Student ON StudentPreference.student_id = Student.student_id
		LEFT OUTER JOIN Company ON StudentPreference.company_id = Company.company_id;
	
--All
SELECT 
	Student.firstname || ' ' || Student.lastname 					AS Schüler,
	Class.name 														AS SchülerKlasse,
	Room.name 														AS Raum,
	Scheduler.timeslot_start || ' - ' || Scheduler.timeslot_end 	AS Zeitraum,
	Company.name || ' ' || Company.job_occupation 					AS Veranstaltung,
	Event.name 														AS Veranstaltungstag
	FROM StudentAppointment
		LEFT OUTER JOIN Student ON StudentAppointment.student_id = Student.student_id
		LEFT OUTER JOIN Class ON Student.class_id = Class.class_id
		LEFT OUTER JOIN Timeslot ON StudentAppointment.timeslot_id = Timeslot.timeslot_id
		LEFT OUTER JOIN Scheduler ON Timeslot.scheduler_id = Scheduler.scheduler_id
		LEFT OUTER JOIN Room ON Timeslot.room_id = Room.room_id
		LEFT OUTER JOIN Event ON Timeslot.event_id = Event.event_id
		LEFT OUTER JOIN Company ON Timeslot.company_id = Company.company_id;

--Veranstaltungen
SELECT 
	Scheduler.timeslot_start || ' - ' || Scheduler.timeslot_end 	AS Zeitraum,
	Room.name 														AS Raum,
	Company.name || ' ' ||Company.job_occupation 							AS Veranstaltung,
	Event.name 														AS Veranstaltungstag
	FROM Timeslot
		LEFT OUTER JOIN Scheduler ON Timeslot.scheduler_id = Scheduler.scheduler_id
		LEFT OUTER JOIN Room ON Timeslot.room_id = Room.room_id
		LEFT OUTER JOIN Event ON Timeslot.event_id = Event.event_id
		LEFT OUTER JOIN Company ON Timeslot.company_id = Company.company_id;
		
	
