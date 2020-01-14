---
layout: home
title: Home
main: true
---

# ScaFi Aggregate Programming Toolkit #


### Introduction ###

**ScaFi** (**Sca**la **Fi**elds) is a Scala-based library and framework for Aggregate Programming.
It implements a variant of the Higher-Order Field Calculus (HOFC) operational semantics,
which is made available as a usable domain-specific language (DSL),
and provides a platform and API for simulating and executing Aggregate Computing systems and applications.

### Skeleton repositories ###

- https://github.com/scafi/hello-scafi : shows basic usage of ScaFi
- https://github.com/scafi/learning-scafi-alchemist : shows how to use ScaFi within the Alchemist simulator in order to simulate aggregate systems

### Usage ###

<!-- **NOTE:** the following examples and instructions may not be up-to-date; please refer to the `demos` module in the project repository for up-to-date information. -->

Steps

* Add the dependency to scafi in your project (e.g., via sbt)

{% highlight scala %}

val scafi_core  = "it.unibo.apice.scafiteam" %% "scafi-core"  % "0.3.2"
val scafi_simulator  = "it.unibo.apice.scafiteam" %% "scafi-simulator"  % "0.3.2"
val scafi_simulator_gui  = "it.unibo.apice.scafiteam" %% "scafi-simulator-gui"  % "0.3.2"
val scafi_platform = "it.unibo.apice.scafiteam" %% "scafi-distributed"  % "0.3.2"

libraryDependencies ++= Seq(scafi_core, scafi_simulator_gui, scafi_platform)
{% endhighlight %}

* Use the API (e.g., to set up a simple simulation)


{% highlight scala %}
package experiments

import it.unibo.scafi.incarnations.BasicSimulationIncarnation.AggregateProgram

object MyAggregateProgram extends AggregateProgram {

  override def main() = gradient(isSource)

  def gradient(source: Boolean): Double =
    rep(Double.PositiveInfinity){ distance =>
      mux(source) { 0.0 } {
        foldhood(Double.PositiveInfinity)(Math.min)(nbr{distance}+nbrRange)
      }
    }

  def isSource = sense[Boolean]("source")
  def nbrRange = nbrvar[Double](NBR_RANGE_NAME)
}

import it.unibo.scafi.simulation.gui.{Launcher, Settings}

object SimulationRunner extends Launcher {
  Settings.Sim_ProgramClass = "experiments.MyAggregateProgram"
  Settings.ShowConfigPanel = true
  launch()
}
{% endhighlight %}

### Main Researchers and Authors ###

* Mirko Viroli
* Roberto Casadei

### Research Collaborators ###

* Ferruccio Damiani
* Giorgio Audrito

### References ###

* See [papers](/papers/)

### Contacts ###

* roby [dot] casadei [at] unibo.it
* mirko [dot] viroli [at] unibo.it
