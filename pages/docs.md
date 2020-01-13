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

TBD

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
