---
layout: page
title: Docs
permalink: /docs/
main: true
---

* Do not remove this line (it will not be displayed)
{:toc}

# Scafi Documentation

## Introduction: Aggregate Programming

Aggregate Programming
is a paradigm
for the development of _collective adaptive systems (CAS)_.
It provides a compositional, functional programming model
 for expressing the self-organising behaviour of a CAS
 by a global perspective.
Aggregate Computing (AC) is formally grounded in the _field calculus (FC)_,
 a minimal core language that captures the key mechanisms
 for bridging local and global behaviour.
FC is based on the notion of a _(computational) field_,
 a (possibly dynamic) map from a (possibly dynamic) domain of devices to computational values.

Aggregate Computing is based on a logical model that can be mapped diversely onto physical infrastructure.

* From a structural point of view,
 an aggregate system is merely a graph or network of devices (also called: nodes, agents, robots).
The edges connecting nodes represent logical communication channels
 that are set up by the aggregate computing platform
 according to an application-specific _neighbouring relationship_
 (which, for situated system, is typically a communication range).
* From a behavioural point of view,
 any device continuously interprets the aggregate program
 against its local context.
* From an interactional point of view,
 any device continuously interacts with its neighbours
 to acquire and propagate context.
 This is what enables local activity to influence global activity and viceversa.

In practice, devices sustain the aggregate computation
 through _asynchronous rounds_ which conceptually consist of the following steps:

1. _Context update_: the device retrieves previous state, environment data (through sensors), and messages from neighbours.
2. _Aggregate program execution_: the field computation is executed against the local context; this yields an *output*.
3. _Export broadcasting to neighbours_: from the output, a subset of data (called an _export_) for neighbour coordination can be automatically derived;
 the export has to be broadcast to the entire neighbourhood.
4. _Execute actuators_: the output of the program can describe a set of actuations to be performed on the environment.

A code example of round execution in ScaFi is shown in <a href="#building-aggregate-systems">Building Aggregate Systems</a>.

## Hello, ScaFi

Steps

1) Add the dependency to scafi in your project (e.g., via sbt)

SBT

{% highlight scala %}
val scafi_core  = "it.unibo.apice.scafiteam" %% "scafi-core"  % "0.3.2"
val scafi_simulator_gui  = "it.unibo.apice.scafiteam" %% "scafi-simulator-gui"  % "0.3.2"

libraryDependencies ++= Seq(scafi_core, scafi_simulator_gui)
{% endhighlight %}

GRADLE (`build.gradle.kts`)

{% highlight kotlin %}
plugins {
    java
    scala
}

dependencies {
    implementation("org.scala-lang:scala-library:2.12.2")
    implementation("it.unibo.apice.scafiteam:scafi-core_2.12:0.3.2")
    implementation("it.unibo.apice.scafiteam:scafi-simulator-gui_2.12:0.3.2")
}
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

## ScaFi Architecture

TBD

## Aggregate Programming

TBD

## ScaFi Standard Library

TBD

### Basic API

TBD

#### Field-operation utilities

#### Gradients

#### Gradient-cast (G)

#### Collect-cast (C)

#### Time-decay (T)

#### Leader election (S)

Block `S` (Sparse-choice) is used to perform decentralised leader election on a spatial basis.

```scala
val leader = S(grain = 10, metric = () => 1)
```
The previous snippet is used to elect leader with a mean distance of 10 hops between two leaders.
The output is a boolean field that is true in correspondence of devices that are currently leader.


### Process API

TBD

### Domain-specific APIs

TBD

#### Flocking

#### Crowd management

## Simulating Aggregate Systems

TBD

### ScaFi simulator

TBD

### Alchemist simulator

TBD

## Building Aggregate Systems

TBD

Standalone setup

{% highlight scala %}
import it.unibo.scafi.incarnations.BasicAbstractIncarnation

object MyIncarnation extends BasicAbstractIncarnation

import MyIncarnation._

class BasicUsageProgram extends AggregateProgram  {
  override def main(): Any = rep(0)(_ + 1)
}

object BasicUsage extends App {
  val program = new BasicUsageProgram()
  val c1 = factory.context(selfId = 0, exports = Map(), lsens = Map(), nbsens = Map())
  val e1 = program.round(c1)

  val c2 = factory.context(0, Map(0 -> e1))
  val e2 = program.round(c2)

  println(s"c1=$c1\ne1=$e1\n\nc2=$c2\ne2=$e2")
}
{% endhighlight %}
