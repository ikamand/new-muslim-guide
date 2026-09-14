package expo.modules.adhanalarm

import android.content.Context
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

/** One adhan as JavaScript hands it over. See `modules/adhan-alarm/index.ts`. */
class AlarmRecord : Record {
  @Field val id: String = ""
  @Field val fireAt: Double = 0.0
  @Field val sound: String = ""
  @Field val title: String = ""
  @Field val playingText: String = ""
  @Field val quietText: String = ""
  @Field val stopLabel: String = ""
  @Field val playOnSilent: Boolean = false
  @Field val playInDnd: Boolean = false

  fun toAlarm() =
    AdhanAlarm(
      id = id,
      fireAt = fireAt.toLong(),
      sound = sound,
      title = title,
      playingText = playingText,
      quietText = quietText,
      stopLabel = stopLabel,
      playOnSilent = playOnSilent,
      playInDnd = playInDnd,
    )
}

/** The channel names Android shows in the app's notification settings, in the reader's language. */
class ChannelNames : Record {
  @Field val playing: String = "Adhan"
  @Field val quiet: String = "Prayer times"
}

class AdhanAlarmModule : Module() {
  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  override fun definition() =
    ModuleDefinition {
      Name("AdhanAlarm")

      AsyncFunction("replaceAll") { alarms: List<AlarmRecord>, channels: ChannelNames ->
        AdhanNotifications.ensureChannels(context, channels.playing, channels.quiet)
        AdhanScheduler.replaceAll(context, alarms.map { it.toAlarm() })
        alarms.size
      }

      AsyncFunction("ringSoon") { alarm: AlarmRecord, channels: ChannelNames ->
        AdhanNotifications.ensureChannels(context, channels.playing, channels.quiet)
        AdhanScheduler.add(context, alarm.toAlarm())
      }

      AsyncFunction<Unit>("cancelAll") {
        AdhanScheduler.cancelAll(context)
      }

      Function<String?>("lastOutcome") {
        AdhanStore.lastOutcome(context)
      }

      Function<Boolean>("canScheduleExact") {
        AdhanScheduler.canScheduleExact(context)
      }
    }
}
