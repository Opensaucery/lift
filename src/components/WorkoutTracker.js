import React from "react";

const WorkoutTracker = ({ workouts }) => {

    
    return (
        <div>
            <PreviousWorkouts 
                workouts={workouts}
            />
        </div>
    );
};

const PreviousWorkouts = ({ workouts }) => {
    console.log("Rendering in WorkoutTracker:", workouts);

    // Convert the workouts object into an array
    const workoutDates = workouts ? Object.keys(workouts).sort().reverse() :[];

    
    
    return (
        <div>
            {workoutDates.map(date => {
                // Convert date format
                const formatDate = new Date(date).toLocaleDateString('en-GB');
                return (
                    <div key={date}>
                        <h2>Workout for {formatDate}</h2>
                        {workouts[date].map((exercise, index) => (
                            <div key={index}>
                                <h3>{exercise.exercise}</h3>
                                <div className="prev-workouts">
                                    {exercise.sets.map((set, indexSet) => (
                                        <div key={indexSet}>Set {set.setNumber}: {set.reps} reps</div>
                                        ))}
                                    </div>
                            </div>
                        ))}
                    </div>
                )
            })}
        </div>
    );
};

export default WorkoutTracker;