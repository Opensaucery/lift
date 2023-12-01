import React, { useEffect} from "react";

const WorkoutTracker = ({ workouts }) => {

    // useEffect(() => {
    //     // Save to localStorage whenever workouts state changes
    //     localStorage.setItem('workouts', JSON.stringify(workouts));
    // }, [workouts]); 

    // Render previous workouts 
    return (
        <div>
            <PreviousWorkouts workouts={workouts} />
        </div>
    );
};

const PreviousWorkouts = ({ workouts }) => {
    console.log("Rendering in WorkoutTracker:", workouts);

    // Convert the workouts object into an array
    const workoutDates = workouts ? Object.keys(workouts).sort().reverse() :[];

    return (
        <div>
            {workoutDates.map(date => (
                <div key={date}>
                    <h3>Workout for {date}</h3>
                    {workouts[date].map((exercise, index) => (
                        <div key={index}>
                            <h4>{exercise.exercise}</h4>
                            {exercise.sets.map((set, indexSet) => (
                                <div key={indexSet}>Set {set.setNumber}: {set.reps} reps</div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default WorkoutTracker;