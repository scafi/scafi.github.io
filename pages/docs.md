---
layout: page
title: Docs
permalink: /docs/
main: true
custom_js:
- https://cdn.rawgit.com/pcooksey/bibtex-js/5ccf967/src/bibtex_js.js
---

<bibtex src="{{ '/assets/biblio.bib' | relative_url }}"></bibtex>


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

* Consider the following repository: [https://github.com/scafi/hello-scafi](https://github.com/scafi/hello-scafi)

As another example, consider the following steps.

1) Add the dependency to scafi in your project (e.g., via sbt)

1A) SBT

{% highlight scala %}
val scafi_core  = "it.unibo.apice.scafiteam" %% "scafi-core"  % "0.3.2"
val scafi_simulator_gui  = "it.unibo.apice.scafiteam" %% "scafi-simulator-gui"  % "0.3.2"

libraryDependencies ++= Seq(scafi_core, scafi_simulator_gui)
{% endhighlight %}

1B) GRADLE (`build.gradle.kts`)

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

// the following may be needed when running using Java 11
tasks.withType<ScalaCompile> {
    sourceCompatibility = "1.8"
    targetCompatibility = "1.8"
}
{% endhighlight %}

2) Use the API (e.g., to set up a simple simulation)

2.1) Import or define an incarnation (a family of types),
from which you can import types like `AggregateProgram`

{% highlight scala %}
package experiments

// Method #1: Use an incarnation which is already defined
import it.unibo.scafi.incarnations.BasicSimulationIncarnation.AggregateProgram

// Method #2: Define a custom incarnation and import stuff from it
object MyIncarnation extends it.unibo.scafi.incarnations.BasicAbstractIncarnation
import MyIncarnation._
{% endhighlight %}

2.2) Define an `AggregateProgram` which expresses the global behaviour of an ensemble.

{% highlight scala %}
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
{% endhighlight %}

2.3) Use the ScaFi internal simulator to run the program on a predefined network of devices.

{% highlight scala %}
import it.unibo.scafi.simulation.gui.{Launcher, Settings}

object SimulationRunner extends Launcher {
  Settings.Sim_ProgramClass = "experiments.MyAggregateProgram"
  Settings.ShowConfigPanel = true
  launch()
}
{% endhighlight %}

Alternatively, you can use the approach taken in <a href="#building-aggregate-systems">Building Aggregate Systems</a>.
Indeed, an `AggregateSystem` object can be seen as a function from `Context` to `Export`:
you give a certain context, and get some export. The export must be passed to neighbours so that they can build their own context
and re-interpret the aggregate program.

2.4) After a simple infestigation, you may want to switch to a more sophisticated simulator, like Alchemist.
Take a look at <a href="#Alchemist-simulator">Alchemist simulator</a>
for details about the use of ScaFi within Alchemist.

## ScaFi Architecture

TBD

## Aggregate Programming

Here, we explain the basic constructs of the field calculus,
which are the core of the aggregate programming paradigm.
By combining these constructs, higher-level functions can be defined
to capture increasingly complex collective behaviour.

Consider the `Constructs` trait.

{% highlight scala %}
trait Constructs {
  def rep[A](init: => A)(fun: A => A): A
  def share[A](init: => A)(fun: (A, () => A) => A): A
  def nbr[A](expr: => A): A
  def foldhood[A](init: => A)(acc: (A, A) => A)(expr: => A): A
  def branch[A](cond: => Boolean)(th: => A)(el: => A)

  def mid: ID
  def sense[A](sensorName: String): A
  def nbrvar[A](name: NSNS): A
}
{% endhighlight %}

TBD

## ScaFi Standard Library

Parts of the ScaFi library is described in the following papers:

<div class="bibtex_display" bibtexkey="Casadei2016mass|casadei2018agere|casadei2018scp"></div>

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

The previous snippet is used to elect leaders with a mean distance of 10 hops between two leaders.
The output is a boolean field that is true in correspondence of devices that are currently leader.


### Process API

For an introduction to the **aggregate process** concept and its API, consider reading the following paper:

<div class="bibtex_display" bibtexkey="casadei19processes"></div>

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

* Consider the following skeleton repository: [https://github.com/scafi/learning-scafi-alchemist](https://github.com/scafi/learning-scafi-alchemist)

The ScaFi specific part in an Alchemist simulation descriptor is as follows:

```yaml
incarnation: scafi

pools:
  - pool: &program
      - time-distribution: 1
        type: Event
        actions:
          - type: RunScafiProgram
            parameters: [it.unibo.casestudy.MyProgram, 5.0]
            # 1st argument is the fully-qualified classname of your program (class extending AggregateProgram)
            # 2nd argument is retention time (i.e., amount of simulated time for which exports by neighbours are kept)
      - program: send # this is needed for broadcasting export to neighbours after program execution
```

**NOTE:** the `send` program is needed, otherwise there would be no communication among devices,
 preventing the unfolding of the aggregate logic.

**NOTE:** the ScaFi incarnation does not attempt to create defaults for undeclared molecules.
So, you need to declare all your molecules (including **exports**--otherwise, the exporter component will try to export a yet-to-be-created molecule) before accessing them (e.g., be sure to perform a `node.put()` before a corresponding `node.get()`), or the following error might occur **`The molecule does not exist and cannot create empty concentration`**.

A full Alchemist simulation descriptor is as follows (node: refer to the [Alchemist Documentation](https://alchemistsimulator.github.io/) for more up-to-date information):

```yaml
variables:
  random: &random
    min: 0
    max: 29
    step: 1
    default: 2

export:
  - time

seeds:
  scenario: *random
  simulation: *random

incarnation: scafi

environment:
  type: Continuous2DEnvironment
  parameters: []

network-model:
  type: ConnectWithinDistance #*connectionType
  parameters: [*range]

pools:
  - pool: &program
      - time-distribution:
          type: ExponentialTime
          parameters: [1]
        type: Event
        actions:
          - type: RunScafiProgram
            parameters: [it.unibo.casestudy.MyProgram, 5.0]
      - program: send
  - pool: &move
      - time-distribution: 1
        type: Event
        actions: []

displacements:
  - in:
      type: Grid
      parameters: [0, 0, 200, 80, 10, 10, 1, 1]
    programs:
      - *move
      - *program
    contents:
      - molecule: test
        concentration: true
```


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
